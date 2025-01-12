"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FlagComponent } from "@/components/ui/phone-input";
import { GetCountries, GetState } from "react-country-state-city";
import { Popover } from "@/components/ui/popover";
import { clsxm } from "@/lib/clsxm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Country, State } from "react-country-state-city/dist/esm/types/index";

export function SearchFilters({
  country: show_country = true,
  state: show_state = true,
}: {
  country?: boolean;
  state?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = React.useState(
    searchParams?.get("search") ?? ""
  );
  const [countryInput, setCountryInput] = React.useState(
    searchParams?.get("country") ?? ""
  );
  const [stateInput, setStateInput] = React.useState(
    searchParams?.get("state") ?? ""
  );

  const debouncedSearchInput = useDebounce(searchInput, 500);
  const debouncedCountryInput = useDebounce(countryInput, 500);
  const debouncedStateInput = useDebounce(stateInput, 500);

  const [countriesList, setCountriesList] = React.useState<Country[]>([]);
  const [stateList, setStateList] = React.useState<State[]>([]);

  React.useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  React.useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("search", debouncedSearchInput)
    );
  }, [debouncedSearchInput]);
  React.useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("country", debouncedCountryInput)
    );
  }, [debouncedCountryInput]);
  React.useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("state", debouncedStateInput)
    );
  }, [debouncedStateInput]);

  React.useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const selectedCountry = React.useMemo(() => {
    return countriesList.find((c) => c.name === countryInput);
  }, [countryInput, countriesList]);

  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3 px-4'>
      <div className='flex gap-3'>
        <Input
          value={searchInput}
          prepend={<Search className='size-4' />}
          placeholder='Search by email'
          className='bg-transparent border-input [&>input]:placeholder:text-gray-20 [&>input]:text-gray-60 focus-within:border-gray-20 transition-colors ease-linear duration-200 [&>svg]:text-gray-60'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />

        {show_country && (
          <Popover
            contentClassName='px-2'
            content={() => (
              <Command>
                <CommandList>
                  <ScrollArea className='h-72 lg:min-w-96'>
                    <CommandInput
                      className='border-0 focus-visible:outline-none focus-visible:ring-transparent'
                      placeholder='Search country...'
                    />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setStateList([]);
                          setStateInput("");
                          setCountryInput("");
                        }}
                        className='opacity-60'
                      >
                        Clear selection
                      </CommandItem>
                      {countriesList
                        .filter((x) => x.name)
                        .map((option) => (
                          <CommandItem
                            className='gap-2'
                            key={option.name}
                            onSelect={() => {
                              setCountryInput(option.name);
                              // form.setValue("state", undefined as unknown as any);
                              setStateInput("");

                              setStateList([]);

                              GetState(option.id).then((result) => {
                                setStateList(result);
                              });
                            }}
                          >
                            <FlagComponent
                              country={option.iso2 as unknown as any}
                              countryName={option.name}
                            />
                            <span className='flex-1 text-sm'>
                              {option.name}
                            </span>
                            {option.name && (
                              <span className='text-foreground/50 text-sm'>
                                {option.iso2}
                              </span>
                            )}
                            <CheckIcon
                              className={clsxm(
                                "ml-auto h-4 w-4",
                                option.name === countryInput
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            )}
            useDefaultTrigger={false}
          >
            <Button variant='outline' className='text-gray-60 font-medium'>
              {selectedCountry ? (
                <>
                  <span>Country:</span>

                  <FlagComponent
                    country={selectedCountry.iso2 as unknown as any}
                    countryName={selectedCountry.name}
                  />

                  <span>{selectedCountry.name}</span>
                </>
              ) : (
                <span className='text-gray-80'>Country</span>
              )}
            </Button>
          </Popover>
        )}

        {show_state && (
          <Popover
            contentClassName='px-2'
            content={() => (
              <Command>
                <CommandList>
                  <ScrollArea className='h-72 lg:min-w-96'>
                    <CommandInput
                      className='border-0 focus-visible:outline-none focus-visible:ring-transparent'
                      placeholder='Search state...'
                    />
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setStateInput("");
                        }}
                        className='opacity-60'
                      >
                        Clear selection
                      </CommandItem>
                      {stateList
                        .filter((x) => x.name)
                        .map((option) => (
                          <CommandItem
                            className='gap-2'
                            key={option.name}
                            onSelect={() => {
                              setStateInput(option.name);
                            }}
                          >
                            <span className='flex-1 text-sm'>
                              {option.name}
                            </span>
                            <CheckIcon
                              className={clsxm(
                                "ml-auto h-4 w-4",
                                option.name === stateInput
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            )}
            useDefaultTrigger={false}
          >
            <Button variant='outline' className='text-gray-60 font-medium'>
              {stateInput && stateInput?.length >= 1 ? (
                <>
                  <span>State: {stateInput}</span>
                </>
              ) : (
                <span className='text-gray-80'>State</span>
              )}
            </Button>
          </Popover>
        )}
      </div>
    </div>
  );
}
