import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Country } from "../entities/Country";

@InputType()
class CountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field()
  continent: string;
}

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    const allCountries = await Country.find();
    return allCountries;
  }

  @Query(() => Country)
  async getCountry(@Arg("code") code: string): Promise<Country> {
    const country = await Country.findOne({ where: { code } });
    if (!country) {
      throw new Error("Country not found");
    }
    return country;
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[]> {
    const countries = await Country.find({ where: { continent } });
    if (!countries || countries.length === 0) {
      throw new Error("Country not found");
    }
    return countries;
  }

  @Mutation(() => ID)
  async createCountry(@Arg("data") data: CountryInput) {
    const country = Country.create({
      ...data,
    });
    await country.save();
    return country.id;
  }
}
