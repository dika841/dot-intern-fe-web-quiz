import { NextPage } from "next";
import { ReactElement } from "react";
import { LoginModule } from "./_modules/login-module";

const Login:NextPage = ():ReactElement => {
    return (
        <section>
            <LoginModule/>
        </section>
    )
};
export default Login;