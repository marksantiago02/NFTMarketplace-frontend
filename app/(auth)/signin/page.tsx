'use client'

import React, {useEffect} from "react"
import { useRouter } from "next/navigation"
import {signIn, useSession} from "next-auth/react"
import {useAccount } from 'wagmi'
import {
    Button,
    Input,
    Link,
    Divider,
    User,
    Checkbox,
  } from "@nextui-org/react";
  import { Icon } from "@iconify/react";

