
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface ScenarioTableProps {
  title: string;
  data: any[];
  columns: {
    key: string;
    header: string;
    valueFormatter?: (value: any) => string;
    className?: string;
  }[];
  valueFormatter?: (value: number) => string;
  className?: string;
  caption?: string;
}

const ScenarioTable: React.FC<ScenarioTableProps> = ({
  title,
  data,
  columns,
  valueFormatter = (value) => `₸${value.toLocaleString()}`,
  className,
  caption,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell 
                    key={column.key}
                    className={column.className}
                  >
                    {column.valueFormatter 
                      ? column.valueFormatter(row[column.key])
                      : typeof row[column.key] === 'number' && !isNaN(row[column.key])
                        ? valueFormatter(row[column.key])
                        : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ScenarioTable;
