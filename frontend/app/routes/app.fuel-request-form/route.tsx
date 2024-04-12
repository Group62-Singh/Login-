import { Fragment, useState } from 'react';
import { Link } from '@remix-run/react';
import { Table, NumberInput, Grid, Title, Space, Flex, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';

type FormValues = {
    gallonsRequested: number;
    deliveryAddress: string;
    deliveryDate: Date;
    suggestedPrice: number;
    totalAmountDue: number;
}

export default function Index() {
    const form = useForm<FormValues>({
        initialValues: {
            gallonsRequested: 0,
            deliveryAddress: '',
            deliveryDate: new Date(),
            suggestedPrice: 10,
            totalAmountDue: 0
        },
        onValuesChange(values, prev) {
            if (values.gallonsRequested !== prev.gallonsRequested || values.suggestedPrice !== prev.suggestedPrice) {
                form.setFieldValue('totalAmountDue', values.suggestedPrice * values.gallonsRequested)
            }
        }
    });
    return <Fragment>
        <Title order={2}>Fuel Request Form</Title>
        <Space h="lg" />
        <Grid>
            <Grid.Col span={6}>
                <NumberInput
                    label="Gallons requested"
                    placeholder="Gallons requested"
                    required
                    name="gallonsRequested"
                    {...form.getInputProps("gallonsRequested")}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <NumberInput
                    label="Delivery address"
                    placeholder="Delivery address"
                    disabled
                    name="deliveryAddress"
                    {...form.getInputProps("deliveryAddress")}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <DatePickerInput
                    label="Delivery date"
                    placeholder="Delivery date"
                    required
                    name="deliveryDate"
                    {...form.getInputProps("deliveryDate")}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <NumberInput
                    label="Suggested price"
                    placeholder="Suggested price"
                    disabled
                    name="suggestedPrice"
                    {...form.getInputProps("suggestedPrice")}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <NumberInput
                    label="Total amount due"
                    placeholder="Total amount due"
                    disabled
                    name="totalAmountDue"
                    {...form.getInputProps("totalAmountDue")}
                />
            </Grid.Col>
        </Grid>

    </Fragment>
}