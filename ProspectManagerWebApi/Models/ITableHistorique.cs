namespace ProspectManagerWebApi.Models
{
    public interface ITableHistorique
    {
        public ICollection<Modification> Modifications { get; set; }
    }
}
