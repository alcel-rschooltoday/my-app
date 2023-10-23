'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewCommentPage() {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Description' />
        </TextField.Root>
        <SimpleMDE placeholder='Post comment' />
        <Button>Submit Post</Button>
    </div>
  )
}

export default NewCommentPage