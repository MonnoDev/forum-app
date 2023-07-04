import { UserProvider } from "./UserContext";

const Providers = ({children}) => {
  return (
    <div><UserProvider>{children}</UserProvider></div>
  )
}

export default Providers