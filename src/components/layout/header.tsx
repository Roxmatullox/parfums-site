"use client"

import React, {  useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useCart from '@/zustand/cart';
import useAuth from '@/zustand/auth';
import useUserDatas from '@/zustand/account';
import useLocationRules from '@/zustand/location-rules';

import "./layout.scss"

import Link from 'next/link';

import useOrdersAdmin from '@/zustand/orders-admin';


import category from "../../assets/category.png"
import product from "../../assets/product.png"
import users from "../../assets/users.png"
import dashboard from "../../assets/dashboard.jpg"
import Image from 'next/image';



const userPages = ['products', 'about', 'contact' , 'cart' , 'favourite' , 'orders'];

const settings = ['account', 'logout'];

function HomeHeader() {

  let location = usePathname()

  const {role} = useAuth()
  const {logout , isLogin} = useAuth()

  const {Rule} = useLocationRules()


  useEffect(()=>{
    Rule({location:location , isLogin : isLogin , role : role })
  } , [location , Rule , role , isLogin])

  const { getUserDatas , values} = useUserDatas()
  

  useEffect(()=>{
    if (isLogin && values.username.length < 2 ) {
      getUserDatas()
    }
  } , [getUserDatas , isLogin])


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  location = location.slice(0 , 5)

  const JsonCart = Cookies.get("cart")

  const [StorageProducts , setStorageProducts] = useState(JsonCart ? JSON.parse(JsonCart) : null)
  
  const {refresh}= useCart()

  useEffect(()=>{
    setStorageProducts(JsonCart ? JSON.parse(JsonCart) : null)
  } , [refresh])

  const {total , getData} = useOrdersAdmin()

  useEffect(()=>{
    if (isLogin && role === 1 && total === 0) {
      getData()
    }
  } ,[getData])
  

  return (
    <AppBar color='secondary' position="fixed">
      {
        location === "/admi" ? 
        <div>
          <div className='admin-header'>
            <Link href="/admin/orders" ><h3>Orders ({total})</h3></Link>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <h1 style={{
                  padding:"3px 12px",
                  backgroundColor:"gray",
                  borderRadius:"50%",
                  color:"white",
                }}>{values.username.slice(0,1).toUpperCase() || <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> }</h1>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting === "logout") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button
                      key={setting}
                      onClick={logout}
                      style={{
                        color:"black"
                      }}
                    >
                      {
                        setting
                      }
                    </Button>
                  </MenuItem>
                  )
                } else {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link
                      href={`/admin/${setting}`}
                      key={setting}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {setting.toUpperCase()}
                    </Link>
                  </MenuItem>
                  )
                }
              })}
            </Menu>
          </Box>
          </div>
          <div className='admin-aside'>
            <div className="aside-links">
              <Link href="/admin" > <Image width={500} height={500} src={dashboard} alt="" /> <span>Dashboard</span> </Link >
              <hr />
              <Link href="/admin/category" > <Image width={500} height={500} src={category} alt="" /> <span>Categories</span> </Link >
              <hr />
              <Link href="/admin/products" > <Image width={860} height={899} src={product} alt="" /> <span>Products</span> </Link >
              <hr />
              <Link href="/admin/users" > <Image width={500} height={500} src={users} alt="" /> <span>Users</span> </Link >
              <hr />
            </div>
          </div>
        </div> : <></>
      }
      {
        location === "/user" ?
        <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/user"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            User
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
              style={{
                flexDirection:"column"
              }}
            >
              {userPages.map((page) => {
                if (page === "cart") {
                  return (
                      <Link
                      href={`/user/${page}`}
                      key={page}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {StorageProducts?.length > 0 ? `${page} (${StorageProducts?.length})` : `${page}` }
                    </Link>
                  )
                } else {
                  return (
                      <Link
                      href={`/user/${page}`}
                      key={page}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {page}
                    </Link>
                  )
                }
                })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/user"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            User
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userPages.map((page) => {
              if (page === "cart") {
                return (
                    <Link
                    href={`/user/${page}`}
                    key={page}
                    onClick={handleCloseNavMenu}
                    style={{
                      color:"black"
                    }}
                  >
                    {StorageProducts?.length > 0 ? `${page} (${StorageProducts?.length})` : `${page}` }
                  </Link>
                )
              } else {
                return (
                    <Link
                    href={`/user/${page}`}
                    key={page}
                    onClick={handleCloseNavMenu}
                    style={{
                      color:"black"
                    }}
                  >
                    {page}
                  </Link>
                )
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip className='user-header-account' title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <h1 style={{
                  padding:"3px 12px",
                  backgroundColor:"gray",
                  borderRadius:"50%",
                  color:"white",
                }}>{values.username.slice(0,1).toUpperCase() || <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> }</h1>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting === "logout") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button
                      key={setting}
                      onClick={logout}
                      style={{
                        color:"black"
                      }}
                    >
                      {
                        setting
                      }
                    </Button>
                  </MenuItem>
                  )
                } else {
                  return (
                      <Link
                      href={`/user/${setting}`}
                      key={setting}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {setting.toUpperCase()}
                    </Link>
                  )
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container> : <></>
      }
    </AppBar>
  );
}
export default HomeHeader;