'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface CommentForm {
    description: string;
    comment: string;
}

function NewCommentPage() {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<CommentForm>();
  console.log(register('description'));

  return (
    <form 
        className='max-w-xl space-y-3' 
        onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/comments', data);
            router.push('/comments');
        })}>
        <TextField.Root>
            <TextField.Input placeholder='Description' {...register('description')} />
        </TextField.Root>
        <Controller
            name="comment"
            control={control}
            render={({ field }) => <SimpleMDE placeholder='Post comment' {...field}/>}>
        </Controller>
        
        <Button>Submit Post</Button>
    </form>
  )
}

export default NewCommentPage