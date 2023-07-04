import Navigation from "../../components/Navigation/Navigation"

const ClientLayout = ({children}) => {
  return (
    <div>
        <Navigation/>
        <div>{children}</div>
    </div>
  )
}

export default ClientLayout