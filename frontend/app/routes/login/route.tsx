import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, Form, Link } from "@remix-run/react";
import { useEffect } from "react";

type FormValues = {
  username: string;
  password: string;
};

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  const payload = await request.json();
  //console.log(payload.get('username'));
  fetch("http://localhost:3000/login", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  return {
    status: 200,
  };
}

export default function Index() {
  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const fetcher = useFetcher<FormValues>();

  const handleSubmit = (values: FormValues) => {
    fetcher.submit(values, {
      method: "post",
      encType: "application/json",
    });
  };

  // useEffect(() => {

  // console.log(data);
  // })

  return (
    <Container size={420} my={40}>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} to={"/register"}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form method="post" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Username"
            required
            name="username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            required
            mt="md"
            {...form.getInputProps("password")}
            name="password"
          />
          {/* <Group justify="space-between" mt="lg"> */}
          {/* <Checkbox label="Remember me" /> */}
          {/* <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor> */}
          {/* </Group> */}
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
  // return <LoginForm />
}
