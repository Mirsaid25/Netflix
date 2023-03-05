import AppLayout from '@/Layouts/AppLayout'
import React from 'react'
import { useRouter } from 'next/router'

function Post() {
	const router = useRouter()
	const slug  = router.query
  
	return slug.indexid
  }


function index() {	
	const id = Post()
	
  return (
    <AppLayout>
        <div>index</div>
    </AppLayout>
  )
}

export default index