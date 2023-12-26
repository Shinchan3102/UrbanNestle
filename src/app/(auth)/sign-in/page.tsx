'use client'
import CustomButton from '@/components/buttons/CustomButton';
import Input from '@/components/inputs/Input';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { IoMailOutline } from "react-icons/io5";
import { MdKey } from "react-icons/md";
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/libs/actions/getCurrentUser';


const page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (res?.error) {
                toast.error('Invalid credentials');
            }
            else if (res?.ok) {
                toast.success('logged in successfully!');
                router.push('/');
            }

        } catch (error: any) {
            console.log('error')
            toast.error(`Something went wrong ${error?.message}`)
        } finally {
            setIsLoading(false);
        }
    }

    

    return (
        <div className='flex flex-col gap-4 border p-6 rounded-xl pb-10 mx-4'>
            <h1 className='text-center font-medium text-xl'>
                Welcome back!
            </h1>

            <div className='flex flex-col gap-3 text-sm'>
                <CustomButton
                    btnText='Sign In with Google'
                    onClick={() => { signIn('google')}}
                    hasIcon
                    Icon={FcGoogle}
                    isVisible
                    variant='ghost'
                />
                <CustomButton
                    btnText='Sign In with Facebook'
                    onClick={() => { }}
                    hasIcon
                    Icon={SiFacebook}
                    isVisible
                    variant='ghost'
                    iconColor={'text-blue-500'}
                />
            </div>

            <div className='flex gap-2 items-center text-xs text-neutral-500'>
                <hr className='flex-1' />
                <span>or sign in by email</span>
                <hr className='flex-1' />
            </div>

            <form className='max-w-sm min-w-[330px] flex flex-col gap-4'>
                <Input
                    label='Email'
                    id='email'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    hasIcon
                    Icon={IoMailOutline}
                />
                <Input
                    label='Password'
                    id='password'
                    type='password'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    hasIcon
                    Icon={MdKey}
                />

                <CustomButton
                    btnText='Continue'
                    onClick={handleSubmit(onSubmit)}
                    hasIcon
                    isVisible={isLoading}
                    isLoading
                />
            </form>
            <div className='flex items-center gap-2 text-sm text-neutral-400'>
                Don't have an account? <Link href={'/sign-up'} className='text-black hover:underline'>Register</Link>
            </div>
        </div>
    )
}

export default page