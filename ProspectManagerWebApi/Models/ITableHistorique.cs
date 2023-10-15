namespace ProspectManagerWebApi.Models
{
    internal interface ITableHistorique
    {
        public ICollection<Modification> Modifications { get; set; }
    }
}
