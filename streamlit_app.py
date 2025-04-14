
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from datetime import datetime, timedelta

# Set page config
st.set_page_config(
    page_title="Financial Dashboard",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

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

# Sidebar for navigation
st.sidebar.title("Navigation")
page = st.sidebar.radio("Select Page", ["Dashboard", "Profit & Loss", "Cash Flow", "Balance Sheet", "Unit Economics", "Forecasts", "Settings"])

# Sidebar filters
st.sidebar.title("Filters")
date_range = st.sidebar.date_input(
    "Date Range",
    value=(datetime.now() - timedelta(days=365), datetime.now())
)

currency = st.sidebar.selectbox("Currency", ["USD", "EUR", "GBP", "JPY"])

# Main content based on selected page
if page == "Dashboard":
    st.title("Financial Dashboard")
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric(label="Revenue", value="$1.2M", delta="+12%")
    with col2:
        st.metric(label="Expenses", value="$800K", delta="+5%")
    with col3:
        st.metric(label="Profit", value="$400K", delta="+24%")
    with col4:
        st.metric(label="Cash Balance", value="$2.5M", delta="+8%")
    
    # Charts
    st.subheader("Revenue vs Expenses")
    financial_data = generate_financial_data(start_date=date_range[0])
    
    fig = px.line(
        financial_data,
        x="Date",
        y=["Revenue", "Costs", "Profit"],
        title="Financial Performance"
    )
    st.plotly_chart(fig, use_container_width=True)
    
    # Split into two columns
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Profit Margin")
        financial_data["Margin %"] = (financial_data["Profit"] / financial_data["Revenue"]) * 100
        fig = px.bar(financial_data, x="Date", y="Margin %", title="Monthly Profit Margin (%)")
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("Forecast Scenarios")
        scenario_data = generate_scenarios()
        fig = px.line(
            scenario_data,
            x="Date",
            y=["Conservative", "Base Case", "Optimistic"],
            title="Revenue Forecasts"
        )
        st.plotly_chart(fig, use_container_width=True)

elif page == "Profit & Loss":
    st.title("Profit & Loss Statement")
    
    tab1, tab2 = st.tabs(["Charts", "Data"])
    
    with tab1:
        financial_data = generate_financial_data(start_date=date_range[0], periods=12)
        
        st.subheader("Monthly P&L")
        fig = px.bar(
            financial_data,
            x="Date",
            y=["Revenue", "Costs", "Profit"],
            barmode="group",
            title="Monthly Profit & Loss"
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # YoY comparison
        st.subheader("Year-over-Year Comparison")
        current_year = financial_data.copy()
        prev_year = financial_data.copy()
        prev_year["Date"] = prev_year["Date"] - pd.DateOffset(years=1)
        prev_year[["Revenue", "Costs", "Profit"]] = prev_year[["Revenue", "Costs", "Profit"]] * 0.85
        
        combined = pd.concat([current_year, prev_year]).sort_values(by="Date")
        combined["Year"] = combined["Date"].dt.year
        
        fig = px.line(
            combined,
            x=combined["Date"].dt.month,
            y="Profit",
            color="Year",
            title="Profit YoY Comparison",
            labels={"x": "Month"}
        )
        st.plotly_chart(fig, use_container_width=True)
    
    with tab2:
        st.dataframe(financial_data)

elif page == "Unit Economics":
    st.title("Unit Economics Analysis")
    
    unit_data = generate_unit_economics()
    
    # Product selector
    selected_product = st.selectbox("Select Product", unit_data["Product"].tolist())
    
    # Filter data
    product_data = unit_data[unit_data["Product"] == selected_product]
    
    # Display metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric(label="Price", value=f"${product_data['Price'].values[0]:.2f}")
    with col2:
        st.metric(label="Cost", value=f"${product_data['Cost'].values[0]:.2f}")
    with col3:
        st.metric(label="Margin", value=f"${product_data['Margin'].values[0]:.2f}")
    with col4:
        st.metric(label="Margin %", value=f"{product_data['Margin %'].values[0]:.1f}%")
    
    # Charts
    st.subheader("Product Comparison")
    
    fig = px.bar(
        unit_data, 
        x="Product", 
        y=["Price", "Cost", "Margin"],
        barmode="group", 
        title="Price, Cost and Margin by Product"
    )
    st.plotly_chart(fig, use_container_width=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        fig = px.pie(
            unit_data, 
            values="Total Revenue", 
            names="Product",
            title="Revenue Distribution by Product"
        )
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        fig = px.scatter(
            unit_data,
            x="Volume",
            y="Margin %",
            size="Total Profit",
            color="Product",
            title="Margin % vs Volume"
        )
        st.plotly_chart(fig, use_container_width=True)
    
    # Data table
    st.subheader("Unit Economics Data")
    st.dataframe(unit_data)

elif page == "Forecasts":
    st.title("Financial Forecasts")
    
    # Forecast parameters
    col1, col2, col3 = st.columns(3)
    with col1:
        base_revenue = st.number_input("Base Revenue", min_value=10000, value=100000, step=10000)
    with col2:
        growth_optimistic = st.slider("Optimistic Growth Rate (%)", min_value=5, max_value=30, value=15)
    with col3:
        growth_conservative = st.slider("Conservative Growth Rate (%)", min_value=1, max_value=15, value=5)
    
    # Generate forecast data
    scenario_data = generate_scenarios(base_revenue=base_revenue)
    
    # Display forecasts
    st.subheader("Revenue Forecast Scenarios")
    fig = px.line(
        scenario_data,
        x="Date",
        y=["Conservative", "Base Case", "Optimistic"],
        title="Revenue Forecasts by Scenario"
    )
    st.plotly_chart(fig, use_container_width=True)
    
    # Cumulative revenue
    st.subheader("Cumulative Revenue")
    cumulative_data = scenario_data.copy()
    for col in ["Conservative", "Base Case", "Optimistic"]:
        cumulative_data[f"{col} Cumulative"] = cumulative_data[col].cumsum()
    
    fig = px.line(
        cumulative_data,
        x="Date",
        y=["Conservative Cumulative", "Base Case Cumulative", "Optimistic Cumulative"],
        title="Cumulative Revenue by Scenario"
    )
    st.plotly_chart(fig, use_container_width=True)
    
    # Data table
    st.subheader("Forecast Data")
    st.dataframe(scenario_data)

else:
    st.title(f"{page}")
    st.write("This page is under development")

# Footer
st.markdown("---")
st.caption("Financial Dashboard created with Streamlit")
