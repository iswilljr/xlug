'use client'

import { Slot } from '@radix-ui/react-slot'
import { createContext, forwardRef, useContext, useId } from 'react'
import { Controller, FormProvider, useFormContext } from 'react-hook-form'
import { Label, type LabelProps } from '@/ui/label'
import { useClasses } from '@/hooks/use-classes'
import { cn } from '@/utils/cn'
import { Input } from './input'
import type { ControllerProps, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import type { ClassNamesProps } from '@/types/classnames'
import type { PartialFields } from '@/types/helpers'

type FormInputClasses = 'root' | 'label' | 'control' | 'description' | 'message'

interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
}

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends PartialFields<React.ComponentProps<typeof FormField<TFieldValues, TName>>, 'render'>,
    Omit<React.ComponentProps<typeof Input>, 'defaultValue' | 'name'>,
    ClassNamesProps<FormInputClasses> {
  description?: React.ReactNode
  label?: React.ReactNode
  withError?: boolean
}

const FormFieldContext = createContext<FormFieldContextValue>({} as any)
const FormItemContext = createContext<FormItemContextValue>({} as any)

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  form,
  ...props
}: FormProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormProvider {...form}>
      <form {...props} />
    </FormProvider>
  )
}

const FormControl = forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    )
  }
)

const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn('text-[0.8rem] text-neutral-500 dark:text-neutral-400', className)}
        {...props}
      />
    )
  }
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}

const FormItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-1', className)} {...props} />
    </FormItemContext.Provider>
  )
})

const FormLabel = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-red-600 dark:text-red-500', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})

const FormMessage = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? (error.type === 'required' ? 'This field is required' : String(error?.message)) : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn('text-[0.8rem] font-medium text-red-600 dark:text-red-500', className)}
        {...props}
      >
        {body}
      </p>
    )
  }
)

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  children,
  control,
  classNames,
  className,
  defaultValue,
  description,
  label,
  name,
  render,
  rules,
  shouldUnregister,
  withError = true,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  const classes = useClasses({ root: className }, classNames)

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState, formState }) => (
        <FormItem className={classes.root}>
          {label && <FormLabel className={classes.label}>{label}</FormLabel>}
          <FormControl {...props}>
            {render ? render({ field, fieldState, formState }) : <Input {...field} />}
          </FormControl>
          {description && <FormDescription className={classes.description}>{description}</FormDescription>}
          {withError && <FormMessage className={classes.message} />}
          {children}
        </FormItem>
      )}
    />
  )
}

Form.displayName = 'Form'
FormControl.displayName = 'FormControl'
FormDescription.displayName = 'FormDescription'
FormField.displayName = 'FormField'
FormItem.displayName = 'FormItem'
FormLabel.displayName = 'FormLabel'
FormMessage.displayName = 'FormMessage'
FormInput.displayName = 'FormInput'

Form.Control = FormControl
Form.Description = FormDescription
Form.Field = FormField
Form.Input = FormInput
Form.Item = FormItem
Form.Label = FormLabel
Form.Message = FormMessage

export { useFormField, Form }
