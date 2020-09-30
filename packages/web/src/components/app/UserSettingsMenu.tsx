import { selectUsername, signOut } from '@klonzo/common/src'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Gravatar from '../Gravatar'

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const username = useSelector(selectUsername)
  const history = useHistory()

  const handleClick = (event: any) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const doSignOut = () => {
    handleClose()
    signOut()
    history.push('/')
  }

  const searchHistory = () => {
    handleClose()
    history.push('/SearchHistoryView')
  }

  return (
    <div>
      <Tooltip title="Settings" aria-label="Settings">
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <Gravatar email="epfromer@gmail.com" />
        </IconButton>
      </Tooltip>
      <Menu
        elevation={10}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary={username} />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={searchHistory}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Search History" />
        </StyledMenuItem>
        <StyledMenuItem onClick={doSignOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </Menu>
    </div>
  )
}