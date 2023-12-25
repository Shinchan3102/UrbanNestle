'use client'
import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`/api/register`, data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div>
            <form>
                
            </form>
        </div>
    )
}

export default page
