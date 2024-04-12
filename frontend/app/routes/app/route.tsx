import { useState } from 'react';
import { Group, Code, SimpleGrid, Container, Paper, Flex, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Outlet, Link } from '@remix-run/react';
import {
    IconBarrel,
    IconFaceId,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons-react';
import classes from './navbar.module.css';

const data = [
    { link: '/app/fuel-quote-history', label: 'Fuel Quote History', icon: IconBarrel },
    { link: '/app/profile', label: 'Profile', icon: IconFaceId },
    // { link: '', label: 'Security', icon: IconFingerprint },
    // { link: '', label: 'SSH Keys', icon: IconKey },
    // { link: '', label: 'Databases', icon: IconDatabaseImport },
    // { link: '', label: 'Authentication', icon: Icon2fa },
    // { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function Index() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            to={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <nav className={classes.navbar}>
                <div className={classes.navbarMain}>
                    <Group className={classes.header} justify="space-between">
                        <Button component={Link} to={'/app/fuel-request-form'} variant={'filled'} leftSection={<IconPlus size={14} />} w={'100%'}>Request Fuel</Button>
                    </Group>
                    {links}
                </div>

                <div className={classes.footer}>
                    {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                            <span>Change account</span>
                        </a> */}

                    <Link to="/logout" className={classes.link} onClick={(event) => event.preventDefault()}>
                        <IconLogout className={classes.linkIcon} stroke={1.5} />
                        <span>Logout</span>
                    </Link>
                </div>
            </nav>
            <Flex w={'100vw'} p={'3rem'}>
                <Paper shadow="xs" p="xl" withBorder w={'100%'}>

                    <Outlet />
                </Paper>
            </Flex>
        </div>)
}