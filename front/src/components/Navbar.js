import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateGameForm from "./CreateGameForm";

export default function Navbar({token}) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const variants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 30px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const variants_items = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.6,
      },
    },
    closed: {
      opacity: 0,
      x: -50,
      transition: {
        ease: "easeOut",
        damping: 30,
        duration: 1,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <div className="fixed ">
      <motion.nav
        animate={show ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        initial="closed"
        className=" top-0 left-0 bottom-0 fixed w-[245px] "
      >
        {/* inner nav */}
        <div className=" absolute top-0 left-0 bottom-0 w-full bg-white ">
          <motion.ul className="flex flex-col mt-20 gap-2" variants={variants_items}>
            {/* Wrap each Link with motion.li and apply the itemVariants */}
            <motion.li
              variants={variants_items}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full pl-4 gap-2 "
            >
              <HomeIcon/>
              <Link to="/home" className="block py-2 w-full rounded-md ">
                Home
              </Link>
            </motion.li>
            <motion.li
              variants={variants_items}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full pl-4 gap-2"
            >
              <AccountCircleIcon/>
              <Link to="/profile" className="block py-2 w-full">
                Profile
              </Link>
            </motion.li>
            <motion.li
              variants={variants_items}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full pl-4 gap-2 "
            >
              <SettingsIcon/>
              <button className="w-full py-2 text-start">Settings</button>
            </motion.li>
            <motion.li
              variants={variants_items}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full pl-4 gap-2"
            >
              <AddBoxIcon/>
              <button className="w-full py-2 text-start" onClick={handleClickOpen}>Create</button>
              <Dialog
                className="flex flex-col items-center"
                open={open}
                onClose={handleClose}
                fullWidth
              >
                <DialogContent>
                  <CreateGameForm token={token}/>
                </DialogContent>
              </Dialog>
            </motion.li>
          </motion.ul>
        </div>
      </motion.nav>

      <motion.button
        className="fixed left-[0.5%] top-[1.1%]  font-medium rounded-full w-[60px] h-[60px]  shadow-xl text-black border-white  bg-white"
        onClick={() => {
          setShow(!show);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }} // Start with an opacity of 0 (completely transparent)
        animate={{ opacity: 1 }} // End with an opacity of 1 (fully visible)
        transition={{ duration: 1.5 }}
      >
        {!show ? <MenuIcon /> : <CloseIcon />}
      </motion.button>
    </div>
  );
}
