import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Full prices are high{" "}
          <Text component="span" inherit className={classes.highlight}>
            at all times 
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            You can use our platform to track the full prices and order gallons of full at a lower cost.
          </Text>
        </Container>

        {/* <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg">
            Get started
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Live demo
          </Button>
        </div> */}
      </div>
    </div>
  );
}
