using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using ProspectManagerWebApi.Models;
using System.Collections;
using System.Reflection;

namespace ProspectManagerWebApi.Helpers
{
    public class ModificationHelper
    {
        public static List<Modification> GetModifications<TOriginal, TUpdated>(Utilisateur utilisateur, TOriginal original, TUpdated updated, string parentProperty = "")
        {
            var modifications = new List<Modification>();

            if (typeof(ILabelable).IsAssignableFrom(typeof(TOriginal)) && !string.IsNullOrEmpty(parentProperty))
            {
                var originalLibelle = (original as ILabelable)?.GetLabel();
                var updatedLibelle = (updated as ILabelable)?.GetLabel();

                if (!Equals(originalLibelle, updatedLibelle))
                {
                    modifications.Add(CreateModification<TOriginal>(utilisateur, parentProperty, originalLibelle, updatedLibelle));
                }

                return modifications;
            }

            foreach (var prop in typeof(TUpdated).GetProperties())
            {
                var originalValue = typeof(TOriginal).GetProperty(prop.Name)?.GetValue(original);
                var updatedValue = prop.GetValue(updated);
                var propertyType = prop.PropertyType;

                if (propertyType.IsClass && propertyType != typeof(string))
                {
                    var getModificationsMethod = typeof(ModificationHelper).GetMethod(nameof(GetModifications), BindingFlags.Static | BindingFlags.Public);
                    var genericMethod = getModificationsMethod?.MakeGenericMethod(new Type[] { propertyType, propertyType });
                    var childModifications = genericMethod?.Invoke(null, new object[] { utilisateur, originalValue, updatedValue, prop.Name }) as List<Modification>;

                    if (childModifications != null)
                    {
                        modifications.AddRange(childModifications);
                    }
                }
                else if (!Equals(originalValue, updatedValue) && !typeof(ICollection).IsAssignableFrom(originalValue?.GetType()))
                {
                    var propertyName = string.IsNullOrEmpty(parentProperty) ? prop.Name : $"{parentProperty}.{prop.Name}";
                    modifications.Add(CreateModification<TOriginal>(utilisateur, propertyName, originalValue, updatedValue));
                }
            }

            return modifications;
        }

        private static Modification CreateModification<T>(Utilisateur utilisateur, string propertyName, object originalValue, object updatedValue)
        {
            return new Modification
            {
                Champ = propertyName,
                AncienneValeur = originalValue?.ToString() ?? "",
                NouvelleValeur = updatedValue?.ToString() ?? "",
                DateModification = DateTime.UtcNow,
                Utilisateur = utilisateur
            };
        }
    }
}
