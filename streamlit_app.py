import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from datetime import datetime, timedelta
import os
import json
import hashlib
import uuid
from pathlib import Path

# Set page config
st.set_page_config(
    page_title="Financial Dashboard",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Create data directory if it doesn't exist
DATA_DIR = Path("user_data")
DATA_DIR.mkdir(exist_ok=True)

# User authentication functions
def get_user_hash(username, password):
    """Create a hash for the user's password."""
    return hashlib.sha256(f"{username}:{password}".encode()).hexdigest()

def save_user(username, password_hash):
    """Save a new user to the users database."""
    users_file = DATA_DIR / "users.json"
    if users_file.exists():
        with open(users_file, "r") as f:
            users = json.load(f)
    else:
        users = {}
    
    users[username] = password_hash
    with open(users_file, "w") as f:
        json.dump(users, f)

def verify_user(username, password_hash):
    """Check if the user exists and the password is correct."""
    users_file = DATA_DIR / "users.json"
    if not users_file.exists():
        return False
    
    with open(users_file, "r") as f:
        users = json.load(f)
    
    return username in users and users[username] == password_hash

def get_user_data_path(user_id):
    """Get the path to the user's data directory."""
    user_data_dir = DATA_DIR / user_id
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir

# Initialize session state
if 'user_id' not in st.session_state:
    st.session_state['user_id'] = None

if 'uploaded_data' not in st.session_state:
    st.session_state['uploaded_data'] = None

if 'analysis_results' not in st.session_state:
    st.session_state['analysis_results'] = {}

if 'page' not in st.session_state:
    st.session_state['page'] = "Login"

# Login/Register page
def show_login_page():
    st.title("Вход в систему")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.header("Вход")
        login_username = st.text_input("Имя пользователя", key="login_username")
        login_password = st.text_input("Пароль", type="password", key="login_password")
        login_button = st.button("Войти")
        
        if login_button:
            password_hash = get_user_hash(login_username, login_password)
            if verify_user(login_username, password_hash):
                st.session_state['user_id'] = login_username
                st.session_state['page'] = "Dashboard"
                st.experimental_rerun()
            else:
                st.error("Неверное имя пользователя или пароль")
    
    with col2:
        st.header("Регистрация")
        register_username = st.text_input("Имя пользователя", key="register_username")
        register_password = st.text_input("Пароль", type="password", key="register_password")
        confirm_password = st.text_input("Подтвердите пароль", type="password")
        register_button = st.button("Зарегистрироваться")
        
        if register_button:
            if register_password != confirm_password:
                st.error("Пароли не совпадают")
            elif len(register_username) < 3:
                st.error("Имя пользователя должно содержать не менее 3 символов")
            else:
                users_file = DATA_DIR / "users.json"
                if users_file.exists():
                    with open(users_file, "r") as f:
                        users = json.load(f)
                    if register_username in users:
                        st.error("Пользователь с таким именем уже существует")
                        return
                
                password_hash = get_user_hash(register_username, register_password)
                save_user(register_username, password_hash)
                st.success("Вы успешно зарегистрировались! Теперь вы можете войти.")

# Functions for data generation (in a real app, you'd fetch from an API or database)
def generate_financial_data(start_date, periods=12):
    dates = pd.date_range(start=start_date, periods=periods, freq='M')
    
    # Generate sample financial data
    revenue = np.random.uniform(80000, 120000, size=periods) + np.linspace(0, 20000, periods)
    costs = np.random.uniform(50000, 80000, size=periods) + np.linspace(0, 10000, periods)
    profit = revenue - costs
    
    df = pd.DataFrame({
        'Date': dates,
        'Revenue': revenue,
        'Costs': costs,
        'Profit': profit
    })
    
    return df

def generate_unit_economics(product_count=5):
    products = [f"Product {chr(65+i)}" for i in range(product_count)]
    
    price = np.random.uniform(50, 200, size=product_count)
    cost = price * np.random.uniform(0.4, 0.7, size=product_count)
    margin = price - cost
    margin_pct = (margin / price) * 100
    volume = np.random.randint(100, 5000, size=product_count)
    
    df = pd.DataFrame({
        'Product': products,
        'Price': price,
        'Cost': cost,
        'Margin': margin,
        'Margin %': margin_pct,
        'Volume': volume,
        'Total Revenue': price * volume,
        'Total Cost': cost * volume,
        'Total Profit': margin * volume
    })
    
    return df

def generate_scenarios(base_revenue=100000, scenario_count=3):
    scenarios = ["Conservative", "Base Case", "Optimistic"][:scenario_count]
    
    growth_rates = {
        "Conservative": np.random.uniform(0.01, 0.05, size=12),
        "Base Case": np.random.uniform(0.03, 0.08, size=12),
        "Optimistic": np.random.uniform(0.05, 0.12, size=12)
    }
    
    start_date = datetime.now().replace(day=1)
    dates = pd.date_range(start=start_date, periods=12, freq='M')
    
    results = {}
    for scenario in scenarios:
        revenue = [base_revenue]
        for i in range(11):
            revenue.append(revenue[-1] * (1 + growth_rates[scenario][i]))
        
        results[scenario] = revenue
    
    df = pd.DataFrame(results, index=dates)
    df.index.name = 'Date'
    
    return df.reset_index()

# AI Analysis functions
def analyze_financial_data(df):
    """Perform AI analysis on financial data."""
    analysis = {}
    
    # Overall trend analysis
    revenue_trend = "растет" if df["Revenue"].iloc[-1] > df["Revenue"].iloc[0] else "падает"
    costs_trend = "растут" if df["Costs"].iloc[-1] > df["Costs"].iloc[0] else "падают"
    profit_trend = "растет" if df["Profit"].iloc[-1] > df["Profit"].iloc[0] else "падает"
    
    # Calculate growth rates
    revenue_growth = (df["Revenue"].iloc[-1] / df["Revenue"].iloc[0] - 1) * 100
    costs_growth = (df["Costs"].iloc[-1] / df["Costs"].iloc[0] - 1) * 100
    profit_growth = (df["Profit"].iloc[-1] / df["Profit"].iloc[0] - 1) * 100
    
    # Calculate average margin
    df["Margin %"] = (df["Profit"] / df["Revenue"]) * 100
    avg_margin = df["Margin %"].mean()
    
    # Find most profitable month
    most_profitable_month = df.loc[df["Profit"].idxmax()]
    
    analysis["summary"] = f"""
    ## Общий анализ финансовых показателей:
    
    За анализируемый период выручка **{revenue_trend}** на **{revenue_growth:.1f}%**, 
    затраты **{costs_trend}** на **{costs_growth:.1f}%**, 
    прибыль **{profit_trend}** на **{profit_growth:.1f}%**.
    
    Средняя маржинальность бизнеса составляет **{avg_margin:.1f}%**.
    
    Самый прибыльный месяц - **{most_profitable_month['Date'].strftime('%B %Y')}** 
    с выручкой **{most_profitable_month['Revenue']:,.0f}** и прибылью **{most_profitable_month['Profit']:,.0f}**.
    """
    
    # Seasonality analysis
    if len(df) >= 6:
        summer_months = df[df["Date"].dt.month.isin([6, 7, 8])]
        winter_months = df[df["Date"].dt.month.isin([12, 1, 2])]
        
        if not summer_months.empty and not winter_months.empty:
            summer_avg = summer_months["Revenue"].mean()
            winter_avg = winter_months["Revenue"].mean()
            
            if summer_avg > winter_avg * 1.1:
                season_effect = "Заметна летняя сезонность: выручка в летние месяцы выше."
            elif winter_avg > summer_avg * 1.1:
                season_effect = "Заметна зимняя сезонность: выручка в зимние месяцы выше."
            else:
                season_effect = "Явная сезонность не выявлена."
                
            analysis["seasonality"] = f"""
            ## Анализ сезонности:
            
            {season_effect}
            Средняя выручка за летние месяцы: **{summer_avg:,.0f}**
            Средняя выручка за зимние месяцы: **{winter_avg:,.0f}**
            """
    
    # Recommendations
    recommendations = []
    
    if costs_growth > revenue_growth:
        recommendations.append("Обратите внимание на рост затрат. Темп роста затрат превышает темп роста выручки, что может негативно сказаться на прибыли в будущем.")
    
    if avg_margin < 15:
        recommendations.append("Рекомендуется проработать стратегию повышения маржинальности бизнеса, текущий показатель ниже среднего по рынку.")
    
    if any(df["Profit"] < 0):
        loss_months = df[df["Profit"] < 0]["Date"].dt.strftime("%B %Y").tolist()
        loss_months_str = ", ".join(loss_months)
        recommendations.append(f"Выявлены убыточные месяцы: {loss_months_str}. Проанализируйте причины и разработайте меры по предотвращению убытков.")
    
    analysis["recommendations"] = f"""
    ## Рекомендации:
    
    {"".join(f"- {r}\n" for r in recommendations) if recommendations else "- На основе текущих данных особых рекомендаций нет. Показатели в норме."}
    """
    
    return analysis

def analyze_unit_economics(df):
    """Perform AI analysis on unit economics data."""
    analysis = {}
    
    # Find best and worst products by margin
    best_margin_product = df.loc[df["Margin %"].idxmax()]
    worst_margin_product = df.loc[df["Margin %"].idxmin()]
    
    # Find best and worst products by total profit
    best_profit_product = df.loc[df["Total Profit"].idxmax()]
    worst_profit_product = df.loc[df["Total Profit"].idxmin()]
    
    # Calculate average metrics
    avg_price = df["Price"].mean()
    avg_margin_pct = df["Margin %"].mean()
    
    analysis["summary"] = f"""
    ## Анализ юнит-экономики:
    
    Средняя цена продукта составляет **{avg_price:.2f}**, при средней марже **{avg_margin_pct:.1f}%**.
    
    П��одукт с наибольшей маржинальностью - **{best_margin_product['Product']}** (**{best_margin_product['Margin %']:.1f}%**).
    Продукт с наименьшей маржинальностью - **{worst_margin_product['Product']}** (**{worst_margin_product['Margin %']:.1f}%**).
    
    Самый прибыльный продукт - **{best_profit_product['Product']}** с общей прибылью **{best_profit_product['Total Profit']:,.0f}**.
    Наименее прибыльный продукт - **{worst_profit_product['Product']}** с общей прибылью **{worst_profit_product['Total Profit']:,.0f}**.
    """
    
    # Recommendations
    recommendations = []
    
    low_margin_products = df[df["Margin %"] < 20]["Product"].tolist()
    if low_margin_products:
        low_margin_str = ", ".join(low_margin_products)
        recommendations.append(f"Рассмотрите возможность повышения цен или снижения себестоимости для продуктов с низкой маржинальностью: {low_margin_str}")
    
    low_volume_high_margin = df[(df["Margin %"] > df["Margin %"].mean()) & (df["Volume"] < df["Volume"].mean())]["Product"].tolist()
    if low_volume_high_margin:
        products_str = ", ".join(low_volume_high_margin)
        recommendations.append(f"Увеличьте маркетинговые усилия для продуктов с высокой маржой, но низкими продажами: {products_str}")
    
    analysis["recommendations"] = f"""
    ## Рекомендации по улучшению юнит-экономики:
    
    {"".join(f"- {r}\n" for r in recommendations) if recommendations else "- На основе текущих данных особых рекомендаций нет. Показатели в норме."}
    """
    
    return analysis

def analyze_forecasts(df):
    """Perform AI analysis on forecast scenarios data."""
    analysis = {}
    
    # Calculate growth for each scenario
    first_month = {scenario: df[scenario].iloc[0] for scenario in ["Conservative", "Base Case", "Optimistic"] if scenario in df.columns}
    last_month = {scenario: df[scenario].iloc[-1] for scenario in ["Conservative", "Base Case", "Optimistic"] if scenario in df.columns}
    
    growth = {scenario: (last_month[scenario] / first_month[scenario] - 1) * 100 for scenario in first_month.keys()}
    
    # Calculate average monthly growth rates
    monthly_growth = {}
    for scenario in ["Conservative", "Base Case", "Optimistic"]:
        if scenario in df.columns:
            monthly_changes = [df[scenario].iloc[i+1] / df[scenario].iloc[i] - 1 for i in range(len(df) - 1)]
            monthly_growth[scenario] = sum(monthly_changes) / len(monthly_changes) * 100
    
    analysis["summary"] = f"""
    ## Анализ прогнозных сценариев:
    
    За прогнозный период в 12 месяцев ожидается следующий рост выручки:
    - Консервативный сценарий: **{growth.get('Conservative', 0):.1f}%** (среднемесячный рост: **{monthly_growth.get('Conservative', 0):.2f}%**)
    - Базовый сценарий: **{growth.get('Base Case', 0):.1f}%** (среднемесячный рост: **{monthly_growth.get('Base Case', 0):.2f}%**)
    - Оптимистичный сценарий: **{growth.get('Optimistic', 0):.1f}%** (среднемесячный рост: **{monthly_growth.get('Optimistic', 0):.2f}%**)
    
    К концу прогнозного периода разница между оптимистичным и консервативным сценариями составляет **{(last_month.get('Optimistic', 0) / last_month.get('Conservative', 1) - 1) * 100:.1f}%**.
    """
    
    # Recommendations based on forecasts
    recommendations = []
    
    base_case_growth = growth.get('Base Case', 0)
    if base_case_growth < 10:
        recommendations.append("Базовый сценарий роста довольно консервативный. Рассмотрите возможности для более активного развития бизнеса.")
    elif base_case_growth > 50:
        recommendations.append("Прогнозируемые темпы роста очень высоки. Убедитесь, что у вас достаточно ресурсов для масштабирования и управления таким ростом.")
    
    risk_gap = (last_month.get('Optimistic', 0) - last_month.get('Conservative', 0)) / last_month.get('Base Case', 1) * 100
    if risk_gap > 40:
        recommendations.append(f"Большой разрыв между сценариями ({risk_gap:.1f}%) указывает на высокую неопределенность. Разработайте детальные планы действий для каждого сценария.")
    
    analysis["recommendations"] = f"""
    ## Рекомендации на основе прогнозов:
    
    {"".join(f"- {r}\n" for r in recommendations) if recommendations else "- На основе текущих прогнозов особых рекомендаций нет. Показатели в норме."}
    """
    
    return analysis

# Function to handle file upload and save to user's directory
def handle_file_upload():
    uploaded_file = st.file_uploader("Загрузить финансовые данные (CSV, Excel)", type=["csv", "xlsx", "xls"])
    
    if uploaded_file is not None:
        try:
            if uploaded_file.name.endswith('.csv'):
                df = pd.read_csv(uploaded_file)
            else:
                df = pd.read_excel(uploaded_file)
                
            st.session_state['uploaded_data'] = df
            
            # Save to user directory
            user_dir = get_user_data_path(st.session_state['user_id'])
            file_path = user_dir / f"data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            df.to_csv(file_path, index=False)
            
            st.success(f"Файл успешно загружен и сохранен!")
            return df
        except Exception as e:
            st.error(f"Ошибка при загрузке файла: {str(e)}")
    
    return None

# Function to load user's saved data files
def load_user_data():
    user_dir = get_user_data_path(st.session_state['user_id'])
    data_files = list(user_dir.glob("*.csv"))
    
    if not data_files:
        return None
    
    file_options = [f.name for f in data_files]
    selected_file = st.sidebar.selectbox("Выберите сохраненный файл:", file_options)
    
    if selected_file:
        file_path = user_dir / selected_file
        df = pd.read_csv(file_path)
        st.session_state['uploaded_data'] = df
        return df
    
    return None

# Main app logic
if st.session_state['page'] == "Login" or st.session_state['user_id'] is None:
    show_login_page()
else:
    # Sidebar for navigation and user info
    st.sidebar.title(f"Привет, {st.session_state['user_id']}!")
    if st.sidebar.button("Выйти"):
        st.session_state['user_id'] = None
        st.session_state['page'] = "Login"
        st.experimental_rerun()
    
    st.sidebar.title("Навигация")
    page = st.sidebar.radio("Выберите страницу", ["Дашборд", "Прибыли и убытки", "Юнит-экономика", "Прогнозы"])
    
    # Sidebar filters
    st.sidebar.title("Фильтры")
    date_range = st.sidebar.date_input(
        "Временной период",
        value=(datetime.now() - timedelta(days=365), datetime.now())
    )
    
    currency = st.sidebar.selectbox("Валюта", ["₸", "USD", "EUR"])
    
    # Data source: upload new or use saved
    st.sidebar.title("Источник данных")
    data_source = st.sidebar.radio("Выберите источник:", ["Загрузить новый файл", "Использовать сохраненные", "Сгенерировать пример"])
    
    # Handle data source selection
    if data_source == "Загрузить новый файл":
        uploaded_data = handle_file_upload()
        if uploaded_data is not None:
            st.session_state['uploaded_data'] = uploaded_data
    elif data_source == "Использовать сохраненные":
        saved_data = load_user_data()
        if saved_data is not None:
            st.session_state['uploaded_data'] = saved_data
    else:  # Generate sample data
        # Use existing sample data generation functions
        financial_data = generate_financial_data(start_date=date_range[0])
        unit_data = generate_unit_economics()
        scenario_data = generate_scenarios()
    
    # Main content based on selected page
    if page == "Дашборд":
        st.title("Финансовый дашборд")
        
        # Sample data or user data
        if st.session_state['uploaded_data'] is not None and 'Revenue' in st.session_state['uploaded_data'].columns:
            financial_data = st.session_state['uploaded_data']
            st.success("Используются загруженные данные")
        else:
            financial_data = generate_financial_data(start_date=date_range[0])
            st.info("Используются сгенерированные данные")
        
        # Key metrics
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric(label="Выручка", value=f"{financial_data['Revenue'].sum():,.0f} {currency}", delta=f"{(financial_data['Revenue'].iloc[-1]/financial_data['Revenue'].iloc[0]-1)*100:.1f}%")
        with col2:
            st.metric(label="Расходы", value=f"{financial_data['Costs'].sum():,.0f} {currency}", delta=f"{(financial_data['Costs'].iloc[-1]/financial_data['Costs'].iloc[0]-1)*100:.1f}%")
        with col3:
            st.metric(label="Прибыль", value=f"{financial_data['Profit'].sum():,.0f} {currency}", delta=f"{(financial_data['Profit'].iloc[-1]/financial_data['Profit'].iloc[0]-1)*100:.1f}%")
        with col4:
            margin = (financial_data['Profit'].sum() / financial_data['Revenue'].sum()) * 100
            st.metric(label="Маржа", value=f"{margin:.1f}%", delta=f"{((financial_data['Profit'].iloc[-1]/financial_data['Revenue'].iloc[-1])-(financial_data['Profit'].iloc[0]/financial_data['Revenue'].iloc[0]))*100:.1f} п.п.")
        
        # Charts
        st.subheader("Выручка и расходы")
        fig = px.line(
            financial_data,
            x="Date",
            y=["Revenue", "Costs", "Profit"],
            title="Финансовые показатели"
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # AI Analysis
        st.subheader("ИИ-анализ данных")
        if st.button("Выполнить ИИ-анализ"):
            with st.spinner("Анализируем данные..."):
                analysis = analyze_financial_data(financial_data)
                st.session_state['analysis_results']['financial'] = analysis
        
        if 'financial' in st.session_state['analysis_results']:
            st.markdown(st.session_state['analysis_results']['financial']['summary'])
            if 'seasonality' in st.session_state['analysis_results']['financial']:
                st.markdown(st.session_state['analysis_results']['financial']['seasonality'])
            st.markdown(st.session_state['analysis_results']['financial']['recommendations'])
    
    elif page == "Прибыли и убытки":
        st.title("Отчет о прибылях и убытках")
        
        # Sample data or user data
        if st.session_state['uploaded_data'] is not None and 'Revenue' in st.session_state['uploaded_data'].columns:
            financial_data = st.session_state['uploaded_data']
        else:
            financial_data = generate_financial_data(start_date=date_range[0], periods=12)
        
        tab1, tab2 = st.tabs(["Графики", "Данные"])
        
        with tab1:
            st.subheader("Ежемесячные P&L")
            fig = px.bar(
                financial_data,
                x="Date",
                y=["Revenue", "Costs", "Profit"],
                barmode="group",
                title="Ежемесячные доходы и расходы"
            )
            st.plotly_chart(fig, use_container_width=True)
            
            # YoY comparison if we have data for multiple years
            if len(financial_data) > 13:
                st.subheader("Сравнение год к году")
                financial_data['Year'] = financial_data['Date'].dt.year
                financial_data['Month'] = financial_data['Date'].dt.month
                
                fig = px.line(
                    financial_data,
                    x="Month",
                    y="Profit",
                    color="Year",
                    title="Сравнение прибыли по годам",
                    labels={"Month": "Месяц"}
                )
                st.plotly_chart(fig, use_container_width=True)
        
        with tab2:
            st.dataframe(financial_data)
            
            # Export option
            csv = financial_data.to_csv(index=False).encode('utf-8')
            st.download_button(
                "Скачать данные как CSV",
                csv,
                "financial_data.csv",
                "text/csv",
                key='download-csv'
            )
        
        # AI Analysis
        st.subheader("ИИ-анализ P&L")
        if st.button("Выполнить анализ P&L"):
            with st.spinner("Анализируем P&L данные..."):
                analysis = analyze_financial_data(financial_data)
                st.session_state['analysis_results']['financial'] = analysis
        
        if 'financial' in st.session_state['analysis_results']:
            st.markdown(st.session_state['analysis_results']['financial']['summary'])
            if 'seasonality' in st.session_state['analysis_results']['financial']:
                st.markdown(st.session_state['analysis_results']['financial']['seasonality'])
            st.markdown(st.session_state['analysis_results']['financial']['recommendations'])
            
    elif page == "Юнит-экономика":
        st.title("Анализ юнит-экономики")
        
        # Sample data or user data
        if st.session_state['uploaded_data'] is not None and 'Product' in st.session_state['uploaded_data'].columns:
            unit_data = st.session_state['uploaded_data']
        else:
            unit_data = generate_unit_economics()
        
        # Product selector
        products = unit_data["Product"].unique().tolist()
        selected_product = st.selectbox("Выберите продукт:", products)
        
        # Filter data
        product_data = unit_data[unit_data["Product"] == selected_product]
        
        # Display metrics
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric(label="Цена", value=f"{product_data['Price'].values[0]:.2f} {currency}")
        with col2:
            st.metric(label="Себестоимость", value=f"{product_data['Cost'].values[0]:.2f} {currency}")
        with col3:
            st.metric(label="Маржа", value=f"{product_data['Margin'].values[0]:.2f} {currency}")
        with col4:
            st.metric(label="Маржа %", value=f"{product_data['Margin %'].values[0]:.1f}%")
        
        # Charts
        st.subheader("Сравнение продуктов")
        
        fig = px.bar(
            unit_data, 
            x="Product", 
            y=["Price", "Cost", "Margin"],
            barmode="group", 
            title="Цена, себестоимость и маржа по продуктам"
        )
        st.plotly_chart(fig, use_container_width=True)
        
        col1, col2 = st.columns(2)
        
        with col1:
            fig = px.pie(
                unit_data, 
                values="Total Revenue", 
                names="Product",
                title="Распределение выручки по продуктам"
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            fig = px.scatter(
                unit_data,
                x="Volume",
                y="Margin %",
                size="Total Profit",
                color="Product",
                title="Маржа % vs Объем"
            )
            st.plotly_chart(fig, use_container_width=True)
        
        # Data table
        st.subheader("Данные по юнит-экономике")
        st.dataframe(unit_data)
        
        # AI Analysis
        st.subheader("ИИ-анализ юнит-экономики")
        if st.button("Выполнить анализ юнит-экономики"):
            with st.spinner("Анализируем данные юнит-экономики..."):
                analysis = analyze_unit_economics(unit_data)
                st.session_state['analysis_results']['unit_economics'] = analysis
        
        if 'unit_economics' in st.session_state['analysis_results']:
            st.markdown(st.session_state['analysis_results']['unit_economics']['summary'])
            st.markdown(st.session_state['analysis_results']['unit_economics']['recommendations'])
    
    elif page == "Прогнозы":
        st.title("Финансовые прогнозы")
        
        # Forecast parameters
        col1, col2, col3 = st.columns(3)
        with col1:
            base_revenue = st.number_input("Базовая выручка", min_value=10000, value=100000, step=10000)
        with col2:
            growth_optimistic = st.slider("Оптимистичный темп роста (%)", min_value=5, max_value=30, value=15)
        with col3:
            growth_conservative = st.slider("Консервативный темп роста (%)", min_value=1, max_value=15, value=5)
        
        # Generate forecast data
        scenario_data = generate_scenarios(base_revenue=base_revenue)
        
        # Display forecasts
        st.subheader("Прогноз выручки по сценариям")
        fig = px.line(
            scenario_data,
            x="Date",
            y=["Conservative", "Base Case", "Optimistic"],
            title="Прогноз выручки по сценариям"
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Cumulative revenue
        st.subheader("Накопительная выручка")
        cumulative_data = scenario_data.copy()
        for col in ["Conservative", "Base Case", "Optimistic"]:
            cumulative_data[f"{col} Cumulative"] = cumulative_data[col].cumsum()
        
        fig = px.line(
            cumulative_data,
            x="Date",
            y=["Conservative Cumulative", "Base Case Cumulative", "Optimistic Cumulative"],
            title="Накопительная выручка по сценариям"
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Data table
        st.subheader("Прогнозные данные")
        st.dataframe(scenario_data)
        
        # AI Analysis
        st.subheader("ИИ-анализ прогнозов")
        if st.button("Выполнить анализ прогнозов"):
            with st.spinner("Анализируем прогнозные данные..."):
                analysis = analyze_forecasts(scenario_data)
                st.session_state['analysis_results']['forecasts'] = analysis
        
        if 'forecasts' in st.session_state['analysis_results']:
            st.markdown(st.session_state['analysis_results']['forecasts']['summary'])
            st.markdown(st.session_state['analysis_results']['forecasts']['recommendations'])

# Footer
st.markdown("---")
st.caption("Финансовый дашборд с ИИ-анализом, созданный с помощью Streamlit")
