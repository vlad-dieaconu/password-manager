import React from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "./marginer";

export function LoginForm(props) {
    return <BoxContainer>
        <FormContainer>
            <Marginer direction="vertical" margin={10} />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
        </FormContainer>
        <Marginer direction="vertical" margin={15} />
            <MutedLink href="#">Forgot password?</MutedLink>
            <Marginer direction="vertical" margin="2em" />
            <SubmitButton type="submit">LOGIN</SubmitButton>
            <Marginer direction="vertical" margin="2em" />
            <MutedLink href="#">Don't have an account? <BoldLink href="#">Register</BoldLink></MutedLink>
    </BoxContainer>
}