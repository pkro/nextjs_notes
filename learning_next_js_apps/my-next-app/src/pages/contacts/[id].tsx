import React from 'react';
import {useRouter} from "next/router";
import contacts from "@/pages/api/contacts";
import {Card, Container, Group, Text} from "@mantine/core";
import Link from "next/link";
import {Layout} from "@/components/Layout";

type contactPropsType = {};

export default function Contact({}: contactPropsType) {
    const router = useRouter();
    const id = router.query.id;
    const contact = contacts.find(contact => contact.id === id);

    return <Layout>

        {
            contact ? <Card shadow={'sm'} w={256} withBorder={true}>
                <Card.Section withBorder={true}>{contact.name}</Card.Section>
                <Card.Section>{contact.country}</Card.Section>
            </Card> : <Text>Not found</Text>
        }
    </Layout>;
}
