import * as z from "zod";
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Load from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"






import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signUpValidation } from "@/lib/validation";

import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations";







const SignupForm = () => {
  const { toast } = useToast()
  

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser} = useCreateUserAccount();


  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  
 async function onSubmit(values: z.infer<typeof signUpValidation>) {
    const newUser = await createUserAccount(values);
    if(!newUser) {
      return toast({
        title: "Sign Up failed. Please try again",
       
      }) ;
    }
   // const session  = await signInAccount()
  }
  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <h1 className="flex flex-col font-bold font-mono text-5xl text-teal-600 ">PixPlore</h1>
        <h2 className="h3-bold md:h2-bold pt-5 font-mono sm:pt-5">Create a new account</h2>
        <p className="text-light-3 small-medium font-mono md:base-regular mt-2">To use PixPlore, enter your account details</p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {
            isCreatingUser ? (
              <div className="flex-center gap-2">
               <Load /> Loading...
              </div>
            ) : "Sign up"
          }
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account ?
        <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>

        </p>
      </form>
      </div>
    </Form>
  
  )
}

export default SignupForm