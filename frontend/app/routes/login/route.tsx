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
import { getSession, commitSession } from "../../session.server";
import { isAuthenticated } from "../../utils/isAuthenticated";

type FormValues = {
  username: string;
  password: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = await isAuthenticated(request);
  if (auth && auth.user) {
    return redirect("/app");
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const payload = await request.json();
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  if (response.status === 201) {
    session.set("credentials", { accessToken: result.access_token });
    return redirect("/app/profile", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return {
    message: result.message,
    fields: ["username", "password"],
  };
}

export default function Index() {
  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
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
    if (fetcher.data && "message" in fetcher.data) {
      form.clearErrors();
      const { message, fields } = fetcher.data;
      for (const field of fields) {
        form.setFieldError(field, message);
      }
    }
  });

  return (
    <Container size={420} my={40}>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} to={"/register"}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          method="post"
          encType="application/json"
          onSubmit={form.onSubmit(handleSubmit)}
        >
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
