import { Button } from '@/components/ui/Button';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function AuthPage() {
  return (
    <div className="w-3/4">
      <form>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Логин или E-mail</FieldLabel>
              <Input id="username" type="text" placeholder="test@mail.ru" />
            </Field>
            <Field>
              <FieldDescription>Пароль</FieldDescription>
              <Input id="password" type="password" placeholder="••••••••" />
            </Field>
          </FieldGroup>
          <Button>Войти</Button>
        </FieldSet>
      </form>
    </div>
  );
}
