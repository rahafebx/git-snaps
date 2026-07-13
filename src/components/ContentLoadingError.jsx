export default function ContentLoadingError({error}){ 
    return (
        <div className="text-rose-500 font-medium bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
          {error}
        </div>
    );
}