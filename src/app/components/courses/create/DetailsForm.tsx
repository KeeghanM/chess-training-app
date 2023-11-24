import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Container,
  Em,
  Flex,
  Heading,
  IconButton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export default function DetailsForm(props: {
  finished: (name: string, description: string) => void;
}) {
  const [extrasOpen, setExtrasOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const create = async () => {
    setStatus("loading");
    setError(null);

    if (name === "") {
      setError("Name cannot be empty");
      setStatus("idle");
      return;
    }

    const res = await fetch("/api/courses/create/checkName", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const json = await res.json();
    if (!json.data?.isAvailable) {
      setError("Name is already taken");
      setStatus("idle");
      return;
    }

    props.finished(name, description);
  };

  return (
    <Container size="2">
      <Flex direction={"column"} gap="6">
        <Box>
          <Heading size="5">Give your course a name</Heading>
          <TextField.Root>
            <TextField.Input
              placeholder="Ruy Lopez: For white"
              size={"3"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TextField.Root>
        </Box>
        <Box>
          <Heading size="5">and a helpful description</Heading>
          <TextArea
            rows={5}
            placeholder="An opening course covering all the main lines for White"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box>
          <Flex align={"center"} gap={"2"}>
            <Text>Optional Extras</Text>
            <IconButton
              variant="outline"
              onClick={() => setExtrasOpen(!extrasOpen)}
            >
              <ChevronDownIcon />
            </IconButton>
          </Flex>
          {extrasOpen && (
            <Flex direction={"column"} gap={"2"}>
              <Em>Coming Soon!</Em>
            </Flex>
          )}
        </Box>
        <Flex direction={"column"} gap="2">
          <Button color={"plum"} onClick={create}>
            Create Course
          </Button>
          {error && (
            <Text as="p" color="red">
              {error}
            </Text>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
