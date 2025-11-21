import { Address } from "../../store/types/company";
import { Coordinates } from "../../store/types/macroState";

export function removeNumberMask (values: string): string {
  return values.replaceAll(/[^\d]/g, "");
};

export function removeNumberCurrencyMask (values: string): string {
  return values.replace(',', '.').replace('R$', '');
};

export function formatToBRLCurrency(value: any): string {
  if (isNaN(value)) return "-";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  })
};

export function formatarNomeAbnt(nome: string): string {
    if (!nome) return "-";
    const preposicoes = [
        "da", "de", "do", "das", "dos", "e", "em", "para", "por", "a", "o", "as", "os"
    ];
    return nome
        .toLowerCase()
        .split(' ')
        .map((palavra, i) => {
            if (preposicoes.includes(palavra) && i !== 0) {
                return palavra;
            }
            return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        })
        .join(' ');
}

export function formatMonthYear(isoDateString: string | undefined | null): string {
  if (!isoDateString) return "-";
  
  const date = new Date(isoDateString);
  
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const month = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[month]}/${year}`;
}

export function formatShortMonthYear(isoDateString: string | undefined | null): string {
  if (!isoDateString) return "-";

  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const month = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
  const year = date.getFullYear();

  return `${month}/${year}`;
}

export function formatCPF(cpf: string): string {
  if(!cpf) return "-";
  // Remove any non-digit characters
  cpf = cpf.replace(/\D/g, '');

  // Check if the CPF is a valid length
  if (cpf.length !== 11) {
    return cpf; // Return the CPF as is if it doesn't have 11 digits
  }

  // Format the CPF as "999.999.999-99"
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatTitleCase(input?: string): string {
  if(input == null) return "-";
  
  return input
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        // Sempre capitaliza a primeira palavra
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      if (word.length <= 3) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formatCEP(cep: string | undefined): string {
  if(!cep) return "-";
  // Remove any non-digit characters
  cep = cep.replace(/\D/g, '');

  // Check if the cep is a valid length
  if (cep.length !== 8) {
    return cep; // Return the cep as is if it doesn't have 8 digits
  }

  // Format the cep as "999.999.999-99"
  return cep.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
}

export function formatNumberWithComma(num: string | undefined): string {
  const numberValue = Number(num);
  
  if (isNaN(numberValue)) {
    return "-";
  }
  
  return numberValue.toLocaleString('en-US');
}

export function formatCNPJ(cnpj: string): string {
  // Remove any non-numeric characters
  const numericCnpj = cnpj.replace(/\D/g, '');

  // Check if the CNPJ is valid (must have exactly 14 digits)
  if (numericCnpj.length !== 14) {
    return numericCnpj;
  }

  // Format the CNPJ with separators
  return `${numericCnpj.slice(0, 2)}.${numericCnpj.slice(2, 5)}.${numericCnpj.slice(5, 8)}/${numericCnpj.slice(8, 12)}-${numericCnpj.slice(12)}`;
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters from the input string
  const numericOnly = phoneNumber.replace(/\D/g, '');

  if(numericOnly.length === 0) return "-";

  // Check if the numericOnly string has at least 10 characters
  if (numericOnly.length >= 10) {
    // Extract the country code, area code, and the rest of the phone number
    const countryCode = numericOnly.slice(0, 2);
    const areaCode = numericOnly.slice(2, 4);
    const restOfNumber = numericOnly.slice(4);

    // Format the phone number
    return `+${countryCode} (${areaCode}) ${restOfNumber.slice(0, 5)}-${restOfNumber.slice(5)}`;
  } else {
    // If the input string doesn't have at least 10 characters, return it as is
    return phoneNumber;
  }
}

export function formatDateTime(input: Date | string | undefined | null): string {
  if(input === "") return "-";
  if(!input) return "Data inválida";
  
  let date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(input: Date | string | undefined | null): string {
  if(input === "") return "-";
  if(!input) return "Data inválida";
  
  let date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatAddress(address: Address | undefined): string {
  if(!address) return '-';

  const street = address.street && address.number ? `${address.street ?? ''} ${address.number ?? ''}` : `${address.street ?? ''}`;
  const zipCodeCity = address.zipcode && address.city ? `${address.zipcode} - ${address.city}` : `${address?.city ?? ''}`

  return `${street}${address?.neighbourhood?.length && street?.length ? ',' : ''}
          ${address?.neighbourhood ?? ''}${zipCodeCity?.length && address?.neighbourhood?.length ? ',' : ''}
          ${zipCodeCity}${address.state?.length && zipCodeCity?.length ? ',' : ''}
          ${address.state ?? ''}${address.country?.length && address?.state?.length ? ',' : ''}
          ${address.country ?? ''}`;
}

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  return formattedTime;
};

export const formatCoordinates = (coordinates?: Coordinates): string => {
  if(!coordinates) return '-';

  return `${coordinates[0]}, ${coordinates[1]}`;
};

export function formatDuration(durationInSeconds: number | undefined): string {
  if (durationInSeconds === undefined) {
    return "Duração inválida";
  }

  if (isNaN(durationInSeconds) || durationInSeconds < 0) {
    return "Duração inválida";
  }

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.round((durationInSeconds % 3600) / 60);

  const formattedParts = [];

  if (hours > 0) {
    formattedParts.push(`${hours} hora${hours !== 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    formattedParts.push(`${minutes} minuto${minutes !== 1 ? 's' : ''}`);
  }

  if (formattedParts.length === 0) {
    return "Menos de um minuto";
  }

  return formattedParts.join(' ');
}

export function formatSecondsToHour(seconds: number | undefined) {
  if (seconds === undefined || isNaN(seconds) || seconds < 0) return "-";

  const totalMinutes = Math.floor(seconds / 60);
  const formattedHours = Math.floor(totalMinutes / 60);
  const formattedMinutes = totalMinutes % 60;

  const hoursPart = formattedHours.toString().padStart(2, '0')
  const minutesPart = formattedMinutes.toString().padStart(2, '0');

  return `${hoursPart}:${minutesPart}`;
}

export function formatSecondsToHourNegative(seconds: number | undefined) {
  if (seconds === undefined || isNaN(seconds)) return "-";
  const is_negative = seconds < 0;
  if(is_negative) seconds = Math.abs(seconds);
  const totalMinutes = Math.floor(seconds / 60);
  const formattedHours = Math.floor(totalMinutes / 60);
  const formattedMinutes = totalMinutes % 60;

  const hoursPart = formattedHours.toString().padStart(2, '0')
  const minutesPart = formattedMinutes.toString().padStart(2, '0');

  return `${is_negative ? '-' : ''}${hoursPart}:${minutesPart}`;
}

export function formatSecondsToFullHour(seconds: number | undefined) {
  if (seconds === undefined || isNaN(seconds) || seconds < 0) return "-";

  const totalMinutes = Math.floor(seconds / 60);
  const formattedHours = Math.floor(totalMinutes / 60);
  const formattedMinutes = totalMinutes % 60;
  const formattedSeconds =  Math.floor(seconds % 60);

  const hoursPart = formattedHours.toString().padStart(2, '0')
  const minutesPart = formattedMinutes.toString().padStart(2, '0');
  const secondsPart = formattedSeconds.toString().padStart(2, '0');

  return `${hoursPart}:${minutesPart}:${secondsPart}`;
}

export const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const formatDateCalendarNavDay = (date: Date) => {
  const day = date.getDate();
  const month = date.getUTCMonth();
  const year = date.getFullYear();

  return `${day} de ${monthNames[month]} de ${year}`;
}

export const formatDateCalendarNavMonth = (date: Date) => {
  const month = date.getUTCMonth();
  const year = date.getFullYear();

  return `${monthNames[month]} de ${year}`;
}

export function getDayOfWeek(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Data inválida";
  }

  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

/**
 * Converts seconds to a string in the format hh:mm:ss
 */
export function formatSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
