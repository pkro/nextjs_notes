import React from 'react';
import {List} from "@mantine/core";
import contacts from "@/pages/api/contacts";
import Link from "next/link";
import {Layout} from "@/components/Layout";

type indexPropsType = {};

export default function ({}: indexPropsType) {

    return (<Layout>
        <List>
            {contacts.map((contact) => (
                <List.Item key={contact.id}>
                    <Link href={`/contacts/${contact.id}`}>
                        {contact.name}
                    </Link>
                </List.Item>
            ))
            }

        </List>
    </Layout>);
};
