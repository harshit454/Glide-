"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const countries = [
  { label: "United States", code: "US", phone: "1" },
  { label: "United Kingdom", code: "GB", phone: "44" },
  { label: "India", code: "IN", phone: "91" },
  { label: "Canada", code: "CA", phone: "1" },
  { label: "Australia", code: "AU", phone: "61" },
  { label: "Germany", code: "DE", phone: "49" },
  { label: "France", code: "FR", phone: "33" },
  { label: "United Arab Emirates", code: "AE", phone: "971" },
  { label: "Singapore", code: "SG", phone: "65" },
  { label: "Brazil", code: "BR", phone: "55" },
  { label: "Japan", code: "JP", phone: "81" },
  { label: "China", code: "CN", phone: "86" },
  { label: "Mexico", code: "MX", phone: "52" },
  { label: "Italy", code: "IT", phone: "39" },
  { label: "Spain", code: "ES", phone: "34" },
  { label: "South Africa", code: "ZA", phone: "27" },
  { label: "Nigeria", code: "NG", phone: "234" },
  { label: "Egypt", code: "EG", phone: "20" },
  { label: "Turkey", code: "TR", phone: "90" },
  { label: "Thailand", code: "TH", phone: "66" },
  { label: "Vietnam", code: "VN", phone: "84" },
  { label: "South Korea", code: "KR", phone: "82" },
  { label: "Indonesia", code: "ID", phone: "62" },
  { label: "Saudi Arabia", code: "SA", phone: "966" },
  { label: "Netherlands", code: "NL", phone: "31" },
  { label: "Switzerland", code: "CH", phone: "41" },
  { label: "Sweden", code: "SE", phone: "46" },
  { label: "Norway", code: "NO", phone: "47" },
  { label: "Denmark", code: "DK", phone: "45" },
  { label: "Israel", code: "IL", phone: "972" },
]

interface CountrySelectorProps {
  value: string
  onChange: (phoneCode: string) => void
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 h-full px-3 hover:bg-slate-100/50 font-semibold text-lg border-r border-slate-200 rounded-none"
        >
          <span>+{value}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-40" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList className="max-h-[350px]">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={`${country.code}-${country.phone}`}
                  value={country.label}
                  onSelect={() => {
                    onChange(country.phone)
                    setOpen(false)
                  }}
                  className="flex items-center justify-between cursor-pointer py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{country.label}</span>
                    <span className="text-muted-foreground text-sm">+{country.phone}</span>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4 text-primary",
                      value === country.phone ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
