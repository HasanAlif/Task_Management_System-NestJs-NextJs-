import { Field, InputType } from "@nestjs/graphql";
import { IsString, Min, MinLength } from "class-validator";

@InputType()
export class SignInInput{

    @Field()
    email:string;

    @Field()
    @IsString()
    @MinLength(1)
    password:string;
}