
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface UnitEconomicsProps {
  data: {
    metric: string;
    value: string | number;
    change?: number;
    description?: string;
  }[];
  title: string;
}

const UnitEconomicsTable: React.FC<UnitEconomicsProps> = ({ 
  data,
  title
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Метрика</TableHead>
              <TableHead>Значение</TableHead>
              <TableHead>Изменение</TableHead>
              <TableHead className="hidden md:table-cell">Описание</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.metric}</TableCell>
                <TableCell>{typeof item.value === 'number' ? `₸${item.value.toLocaleString()}` : item.value}</TableCell>
                <TableCell>
                  {item.change !== undefined && (
                    <div className="flex items-center">
                      {item.change > 0 ? (
                        <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                      ) : item.change < 0 ? (
                        <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                      ) : null}
                      <span className={
                        item.change > 0 
                          ? "text-green-500" 
                          : item.change < 0 
                            ? "text-red-500" 
                            : ""
                      }>
                        {item.change > 0 ? "+" : ""}{item.change}%
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.description || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UnitEconomicsTable;
