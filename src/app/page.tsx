import Table from "@/components/Table/Table";
import { usersColumns } from "./constants";

export default function Home() {
  const products = [
    {
      code: "123",
      name: "Bamboo Watch",
      category: "Accessories",
      quantity: 24,
    },
    {
      code: "4124",
      name: "Bamboo Watch",
      category: "Accessories",
      quantity: 24,
    },
    {
      code: "123124",
      name: "Bamboo Watch",
      category: "Accessories",
      quantity: 24,
    },
    {
      code: "124124",
      name: "Bamboo Watch",
      category: "Accessories",
      quantity: 24,
    },
  ];
  return (
    <>
      <Table title="Usuarios" data={products} columns={usersColumns} />
    </>
  );
}
