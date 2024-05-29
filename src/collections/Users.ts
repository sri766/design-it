import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig ={
    slug: 'users',
    auth: {
        verify:{
            generateEmailHTML: ({token}) =>{
                return `<p>Hello plz verify the email</p>`
            }
        }
    },
    access: {
        read: () => true,
        create: () =>true
    },
    fields: [
        {
            name: 'role',
            type: 'select',
            defaultValue: 'user',
            required: true,
            options: [
                {label: "Admin", value:"admin"},
                {label: "User", value: "user"},
            ]

        },

    ],

}