'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

function NewCommentPage() {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Description' />
        </TextField.Root>
        <TextArea placeholder='Post comment' />
        <Button>Submit Post</Button>
    </div>
  )
}

export default NewCommentPage