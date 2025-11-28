'use server';
/**
 * @fileOverview Un flujo de ejemplo para sugerir ideas de proyectos.
 *
 * - suggestProject - Una función que genera una idea para un proyecto de portfolio.
 * - SuggestProjectInput - El tipo de entrada para la función suggestProject.
 * - SuggestProjectOutput - El tipo de retorno para la función suggestProject.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Definimos el esquema de entrada con Zod.
//    Esto define qué datos necesita nuestro flujo.
const SuggestProjectInputSchema = z.object({
  topic: z.string().describe('El tema sobre el que se basará la sugerencia del proyecto.'),
});
export type SuggestProjectInput = z.infer<typeof SuggestProjectInputSchema>;

// 2. Definimos el esquema de salida.
//    Esto define qué datos devolverá nuestro flujo en un formato estructurado.
const SuggestProjectOutputSchema = z.object({
  title: z.string().describe('El título sugerido para el proyecto.'),
  description: z.string().describe('Una breve descripción del proyecto sugerido.'),
});
export type SuggestProjectOutput = z.infer<typeof SuggestProjectOutputSchema>;

// 3. Definimos el "prompt" o la instrucción para el modelo de IA.
const suggestProjectPrompt = ai.definePrompt({
  name: 'suggestProjectPrompt',
  input: {schema: SuggestProjectInputSchema},
  output: {schema: SuggestProjectOutputSchema},
  prompt: `You are an expert career coach. Based on the topic of '{{{topic}}}', 
  suggest a creative and professional-sounding project title and a short, compelling description 
  for a developer's portfolio.`,
});

// 4. Definimos el flujo (flow) que orquesta la lógica.
const suggestProjectFlow = ai.defineFlow(
  {
    name: 'suggestProjectFlow',
    inputSchema: SuggestProjectInputSchema,
    outputSchema: SuggestProjectOutputSchema,
  },
  async (input) => {
    // El flujo llama al prompt con la entrada y espera la respuesta del modelo.
    const {output} = await suggestProjectPrompt(input);
    return output!;
  }
);

// 5. Creamos una función exportable que invoca el flujo.
//    Esta es la función que llamarías desde tu UI de React.
export async function suggestProject(input: SuggestProjectInput): Promise<SuggestProjectOutput> {
  return suggestProjectFlow(input);
}
