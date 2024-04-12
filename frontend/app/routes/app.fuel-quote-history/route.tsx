import { Fragment } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { Table, Title, Space, Flex, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import { isAuthenticated } from "~/utils/isAuthenticated";

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken } = await isAuthenticated(request);
  if (!accessToken) {
    return null;
  }
  const response = await fetch("http://localhost:3000/fuel-requests", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return (await response.json()) as TypedResponse<
    {
      gallons: number;
      deliveryAddress: string;
      deliveryDate: Date;
      price: number;
    }[]
  >;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const rows = (data ?? []).map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.gallons}</Table.Td>
      <Table.Td>{element.deliveryAddress}</Table.Td>
      <Table.Td>{new Date(element.deliveryDate).toLocaleDateString()}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Fragment>
      <Title order={2}>Fuel Quote History</Title>
      <Space h="lg" />
      <Table verticalSpacing={"md"} withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Gallons Requested</Table.Th>
            <Table.Th>Delivery Address</Table.Th>
            <Table.Th>Delivery Date</Table.Th>
            <Table.Th>Suggested Price / gallon</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Fragment>
  );
}
