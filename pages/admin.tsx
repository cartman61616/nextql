import React from "react"
import { userForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import { getSession } from "@auth0/nextjs-auth0"
import prisma from "../lib/prisma"

const CreateLinkMutation = gql`
    mutation($title: String!, $url: String!, $imageUrl: String!, $category: String!, $description: String!) {
    createLink(title: $title, url: $url, imageUrl: $imageUrl, category: $category, description: $description) {
      title
      url
      imageUrl
      category
      description
    }
  }
`

const Admin = () => {
    const {
        register,
        handleSubmit, 
        formState: { errors },
        reset,
    } = userForm()

    const [createLink, { loading, error }] = useMutation(CreateLinkMutation, {
        onCompleted: () => reset()
    })

    const onSubmit = async data => {
        const { title, url, category, description } = data
        const imageUrl = `https://via.placeholder.com/300`
        const variables = { title, url, category, description, imageUrl }
        try {
            toast.promise(createLink({ variables }), {
                loading: 'Creating new link...',
                success: 'Link successfully created!🎉',
                error: `Something went wrong 😥 Please try again -  ${error}`,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto max-w-md py-12">
            <Toaster />
            <h1 className="text-3xl font-medium my-5"></h1>
        </div>
    )