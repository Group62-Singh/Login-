import { Fragment } from 'react';
import { Title, Space, Grid, TextInput, Select, Flex, Button } from '@mantine/core';
import states from '../../utils/states';

export default function Index() {
    return (

        <Fragment>
            <Flex justify={'space-between'}>
                
            <Title order={2}>Profile</Title>
            <Button variant="filled">Save</Button>
                </Flex> 
            <Space h="lg" />
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        label="Full name"
                        placeholder="Full name"
                        required
                        name="fullname"
                        maxLength={50}
                    />
                </Grid.Col>
            </Grid>
            <Space h="lg" />
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        label="Address 1"
                        placeholder="Address 1"
                        required
                        name="address1"
                        maxLength={100}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Address 2"
                        placeholder="Address 2 (Optional)"
                        name="address2"
                        maxLength={100}
                    />
                </Grid.Col>
            </Grid>
            <Space h="lg" />
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        label="City"
                        placeholder="City"
                        required
                        name="city"
                        maxLength={100}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="State"
                        placeholder="State"
                        required
                        name="state"
                        data={states.map((x) => ({value:x.abbreviation, label:x.name}))}
                        maxLength={100}
                        searchable
                    />
                </Grid.Col>
            </Grid>
            <Space h="lg" />
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        label="Zip Code"
                        placeholder="Zip Code"
                        required
                        name="zipcode"
                        minLength={5}
                        maxLength={9}
                    />
                </Grid.Col>
            </Grid>
        </Fragment>
    )
}