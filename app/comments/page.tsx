import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

function Comments() {
  return (
    <div>
        <Button>
            <Link href='/comments/new'>New Comment</Link>
        </Button>
    </div>
  )
}

export default Comments