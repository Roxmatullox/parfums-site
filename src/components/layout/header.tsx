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


const userPages = ['products', 'about', 'contact' , 'cart' , 'favourite' , 'orders'];
const adminPages = ['Products', 'Pricing', 'Blog'];

const settings = ['account', 'logout'];

function HomeHeader() {

  let location = usePathname()

  const { isLogin , role} = useAuth()

  const {Rule} = useLocationRules()


  useEffect(()=>{
    Rule({location:location , isLogin : isLogin , role : role })
  } , [location , Rule , role , isLogin])

  
  const {logout , isLogin} = useAuth()

  const { getUserDatas , values} = useUserDatas()
  

  useEffect(()=>{
    if (isLogin) {
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
    if (isLogin) {
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
                      <Button
                      href={`/admin/${setting}`}
                      key={setting}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
                  )
                }
              })}
            </Menu>
          </Box>
          </div>
          <div className='admin-aside'>
            <div className="aside-links">
              <Link href="/admin" >Dashboard</Link >
              <hr />
              <Link href="/admin/category" >Categories</Link >
              <hr />
              <Link href="/admin/products" >Products</Link >
              <hr />
              <Link href="/admin/users" >Users</Link >
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {userPages.map((page) => {
                if (page === "cart") {
                  return (
                    <MenuItem key={page} onClick={handleCloseUserMenu}>
                      <Button
                      href={`/user/${page}`}
                      key={page}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {StorageProducts?.length > 0 ? `${page} (${StorageProducts?.length})` : `${page}` }
                    </Button>
                  </MenuItem>
                  )
                } else {
                  return (
                    <MenuItem key={page} onClick={handleCloseUserMenu}>
                      <Button
                      href={`/user/${page}`}
                      key={page}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {page}
                    </Button>
                  </MenuItem>
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
                  <MenuItem key={page} onClick={handleCloseUserMenu}>
                    <Button
                    href={`/user/${page}`}
                    key={page}
                    onClick={handleCloseNavMenu}
                    style={{
                      color:"black"
                    }}
                  >
                    {StorageProducts?.length > 0 ? `${page} (${StorageProducts?.length})` : `${page}` }
                  </Button>
                </MenuItem>
                )
              } else {
                return (
                  <MenuItem key={page} onClick={handleCloseUserMenu}>
                    <Button
                    href={`/user/${page}`}
                    key={page}
                    onClick={handleCloseNavMenu}
                    style={{
                      color:"black"
                    }}
                  >
                    {page}
                  </Button>
                </MenuItem>
                )
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <h1 style={{
                  padding:"3px 12px",
                  backgroundColor:"gray",
                  borderRadius:"50%",
                  color:"white",
                  marginTop:"10px"
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
                      <Button
                      href={`/user/${setting}`}
                      key={setting}
                      onClick={handleCloseNavMenu}
                      style={{
                        color:"black"
                      }}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
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