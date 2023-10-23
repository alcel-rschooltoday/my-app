'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type CommentForm = z.infer<typeof createCommentSchema>;

function NewCommentPage() {
  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<CommentForm>({
    resolver: zodResolver(createCommentSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

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
                    setSubmitting(true);
                    await axios.post('/api/comments', data);
                    router.push('/comments');
                } catch (error) {
                    setSubmitting(false);
                    setError('An unexpected error occured.');
                }
            })}>
            <TextField.Root>
                <TextField.Input placeholder='Description' {...register('description')} />
            </TextField.Root>
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Controller
                name="comment"
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Post comment' {...field}/>}>
            </Controller>
            <ErrorMessage>{errors.comment?.message}</ErrorMessage>
            
            <Button disabled={isSubmitting}>
                Submit Post {isSubmitting && <Spinner />}
            </Button>
        </form>
    </div>
  )
}

export default NewCommentPage