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
  json,
  redirect,
} from "@remix-run/node";
import { useFetcher, Form, Link, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { isAuthenticated } from "../../utils/isAuthenticated";

type FormValues = {
  username: string;
  password: string;
  repeatedPassword: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = await isAuthenticated(request);
  if (auth && auth.user) {
    return redirect("/app");
  }
  return null;
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
  if (response.status === 409) {
    const result = await response.json();
    return {
      message: result.message,
      fields: ["username"],
    };
  }
  return json({
    status: response.status,
  });
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
  const navigate = useNavigate();

  const handleSubmit = (values: FormValues) => {
    fetcher.submit(values, {
      method: "post",
      encType: "application/json",
    });
  };

  useEffect(() => {
    if (
      fetcher.data &&
      "status" in fetcher.data &&
      fetcher.data.status === 201
    ) {
      navigate("/login", { replace: true });
    }
    if (fetcher.data && "message" in fetcher.data) {
      form.clearErrors();
      const { message, fields } = fetcher.data;
      for (const field of fields) {
        form.setFieldError(field, message);
      }
    }
  }, [fetcher.data]);

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
