import { Fragment } from 'react';
import { Link } from '@remix-run/react';
import { Table, Title, Space, Flex, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function Index() {
    const elements = [
        { gallons: 6, deliveryaddress: '1234 Anywho USA', deliverydate: '1/24/2024', price: 250.4 },
        { gallons: 7, deliveryaddress: '1234 Anywho USA', deliverydate: '1/24/2024', price: 250.4 },
        { gallons: 39, deliveryaddress: '1234 Anywho USA', deliverydate: '1/24/2024', price: 250.4 },
        { gallons: 56, deliveryaddress: '1234 Anywho USA', deliverydate: '1/24/2024', price: 250.4 },
        { gallons: 58, deliveryaddress: '1234 Anywho USA', deliverydate: '1/24/2024', price: 250.4 },
    ];

    const rows = elements.map((element, index) => (
        <Table.Tr key={index}>
            <Table.Td>{element.gallons}</Table.Td>
            <Table.Td>{element.deliveryaddress}</Table.Td>
            <Table.Td>{element.deliverydate}</Table.Td>
            <Table.Td>{element.price}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Fragment>
            <Title order={2}>Fuel Quote History</Title>
            <Space h="lg" />
            <Table verticalSpacing={'md'} withTableBorder highlightOnHover >
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
    )
}