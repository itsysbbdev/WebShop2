import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types/domain";

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendelések</CardTitle>
        <CardDescription>Az admin itt látja a Stripe checkouttal létrehozott vagy webhookon frissített rendeléseket.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rendelés</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Állapot</TableHead>
              <TableHead>Összeg</TableHead>
              <TableHead>Dátum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>
                  <Badge>{order.status}</Badge>
                </TableCell>
                <TableCell>{formatPrice(order.grandTotal, order.currency)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString("hu-HU")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
