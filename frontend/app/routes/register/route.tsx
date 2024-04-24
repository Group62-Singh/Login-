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
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useFetcher, Form, Link } from "@remix-run/react";
import { useEffect } from "react";

type FormValues = {
  username: string;
  password: string;
  repeatedPassword: string;
};

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  const payload = await request.json();
  if (payload.password !== payload.repeatedPassword) {
    return {
      message: "Repeated password does not match the entered password",
      fields: ["password", "repeatedPassword"],
    };
  }
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 201) {
    return redirect("/login", {
      status: 200,
    });
  }
  const result = await response.json();
  return {
    message: result.message,
    fields: ["username"],
  };
}

export default function Index() {
  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const fetcher = useFetcher<typeof action>();

  const handleSubmit = (values: FormValues) => {
    fetcher.submit(values, {
      method: "post",
      encType: "application/json",
    });
  };

  useEffect(() => {
    form.clearErrors();
    if (fetcher.data && "message" in fetcher.data) {
      const { message, fields } = fetcher.data;
      for (const field of fields) {
        form.setFieldError(field, message);
      }
    }
  }, []);

  return (
    <Container size={420} my={40}>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account?{" "}
        <Anchor size="sm" component={Link} to={"/login"}>
          Log in to your account
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
          <PasswordInput
            label="Repeat Password"
            placeholder="Repeat Password"
            required
            mt="md"
            {...form.getInputProps("repeatedPassword")}
            name="password"
          />
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
  // return <LoginForm />
}
