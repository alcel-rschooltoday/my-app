'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CommentForm {
    description: string;
    comment: string;
}

function NewCommentPage() {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<CommentForm>();
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
        {error && (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        )}
        <form 
            className='space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/comments', data);
                    router.push('/comments');
                } catch (error) {
                    setError('An unexpected error occured.');
                }
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
    </div>
  )
}

export default NewCommentPage