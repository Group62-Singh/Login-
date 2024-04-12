import { Fragment, useState } from "react";
import { Link, useLoaderData, useFetcher } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  redirect,
} from "@remix-run/node";
import {
  Table,
  NumberInput,
  TextInput,
  Grid,
  Title,
  Space,
  Flex,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { isAuthenticated } from "~/utils/isAuthenticated";

type FormValues = {
  gallonsRequested: number;
  deliveryAddress: string;
  deliveryDate: Date;
  suggestedPrice: number;
  totalAmountDue: number;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await isAuthenticated(request);
  if (!user.user && !user.accessToken) {
    return redirect("/login");
  }
  const response = await fetch("http://localhost:3000/auth/profile", {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  const result = await response.json();
  return {
    deliveryAddress: `${result.address1 ?? result.address2}, ${result.city}, ${result.state} ${result.zipCode}`,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await isAuthenticated(request);
  if (!user.accessToken) {
    return redirect("/login");
  }
  const payload = await request.json();
  const response = await fetch("http://localhost:3000/fuel-requests", {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  if (response.status === 201) {
    return redirect("/app/fuel-quote-history");
  }
  const result = await response.json();
  return {
    message: result.message,
  };
  return null;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const form = useForm<FormValues>({
    initialValues: {
      gallonsRequested: 0,
      deliveryAddress: data?.deliveryAddress,
      deliveryDate: new Date(),
      suggestedPrice: 10,
      totalAmountDue: 0,
    },
    onValuesChange(values, prev) {
      if (
        values.gallonsRequested !== prev.gallonsRequested ||
        values.suggestedPrice !== prev.suggestedPrice
      ) {
        form.setFieldValue(
          "totalAmountDue",
          values.suggestedPrice * values.gallonsRequested
        );
      }
    },
  });

  const handleSubmit = (values: FormValues) => {
    fetcher.submit(
      {
        deliveryDate: values.deliveryDate.toISOString(),
        gallons: values.gallonsRequested,
        price: values.totalAmountDue,
        deliveryAddress: values.deliveryAddress,
      },
      {
        method: "post",
        encType: "application/json",
      }
    );
  };

  return (
    <form
      method="post"
      encType="application/json"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Flex justify={"space-between"}>
        <Title order={2}>Fuel Request Form</Title>
        <Button variant="filled" type="submit">
          Save
        </Button>
      </Flex>
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
          <TextInput
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
    </form>
  );
}
