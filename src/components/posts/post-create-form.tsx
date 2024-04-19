"use client";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

interface PostCreateProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create an post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create an post</h3>
            <Input
              className=""
              label="Title"
              name="title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            ></Input>
            <Textarea
              label="Content"
              name="content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            ></Textarea>
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(",")}
              </div>
            ) : null}
            <FormButton>Create post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
