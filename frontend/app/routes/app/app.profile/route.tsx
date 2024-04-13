import { Fragment } from "react";
import {
  Title,
  Space,
  Grid,
  TextInput,
  Select,
  Flex,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  TypedResponse,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { isAuthenticated } from "~/utils/isAuthenticated";
import states from "../../utils/states";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await isAuthenticated(request);
  if (!user.accessToken) {
    return null;
  }
  const response = await fetch("http://localhost:3000/auth/profile", {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return (await response.json()) as TypedResponse<{
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
  }>;
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await isAuthenticated(request);
  if (!user.accessToken) {
    return redirect("/login");
  }
  const payload = await request.json();
  const response = await fetch("http://localhost:3000/auth/profile", {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  if (response.status === 201) {
    return null;
  }
  const result = await response.json();
  return {
    message: result.message,
  };
}

type FormValues = {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const form = useForm<FormValues>({
    initialValues: data as FormValues,
  });
  const fetcher = useFetcher<typeof action>();

  const handleSubmit = (values: FormValues) => {
    fetcher.submit(values, {
      method: "post",
      encType: "application/json",
    });
  };

  return (
    <form
      method="post"
      encType="application/json"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Flex justify={"space-between"}>
        <Title order={2}>Profile</Title>
        <Button variant="filled" type="submit">
          Save
        </Button>
      </Flex>
      <Space h="lg" />
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Full name"
            placeholder="Full name"
            required
            name="fullname"
            maxLength={50}
            {...form.getInputProps("fullName")}
          />
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Address 1"
            placeholder="Address 1"
            required
            name="address1"
            maxLength={100}
            {...form.getInputProps("address1")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Address 2"
            placeholder="Address 2 (Optional)"
            name="address2"
            maxLength={100}
            {...form.getInputProps("address2")}
          />
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="City"
            placeholder="City"
            required
            name="city"
            maxLength={100}
            {...form.getInputProps("city")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="State"
            placeholder="State"
            required
            name="state"
            data={states.map((x) => ({ value: x.abbreviation, label: x.name }))}
            maxLength={100}
            searchable
            {...form.getInputProps("state")}
          />
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Zip Code"
            placeholder="Zip Code"
            required
            name="zipcode"
            minLength={5}
            maxLength={9}
            {...form.getInputProps("zipCode")}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
}
